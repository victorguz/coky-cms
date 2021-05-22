import { SetMetadata } from "@nestjs/common";
import { UserRoles } from "src/app/modules/built-in/users/entities/user.entity";

export const HAS_USER_ROLE = "roles";

export const AllowedRoles = (...roles: UserRoles[]) => SetMetadata(HAS_USER_ROLE, roles)
