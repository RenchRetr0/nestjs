import { CanActivate, ExecutionContext, Injectable, Inject } from "@nestjs/common";
import { Role } from "../user/enums/role.enum";
import { UserService } from "../user/user.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        

        const request = context.switchToHttp().getRequest();

        if(request?.user) {
            const { id } = request.user;

            const user = this.userService.findOne({ id });

            const roles = request.user.roles;

            return roles == Role.ADMIN;
        }

        return false;
    }
    
}