// auth/guards/roles.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const ROLE_HIERARCHY: Record<string, number> = {
    GUEST: 0,
    EMPLOYEE: 1,
    MANAGER: 2,
    ADMIN: 3,
};

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles || requiredRoles.length === 0) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user || !user.role) return false;

        const userLevel = ROLE_HIERARCHY[user.role];
        const minRequiredLevel = Math.min(...requiredRoles.map(r => ROLE_HIERARCHY[r]));

        return userLevel >= minRequiredLevel;
    }
}
