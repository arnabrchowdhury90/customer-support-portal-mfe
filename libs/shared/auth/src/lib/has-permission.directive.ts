import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
} from '@angular/core';
import { PermissionScope } from '../../../models/src/lib/auth.model';
import { AuthService } from './auth.service';

// Simple UI gate for scope-based access
@Directive({
  selector: '[appHasPermission]',
  standalone: true,
})
export class HasPermissionDirective {
  @Input('appHasPermission') required: PermissionScope | PermissionScope[] = [];
  @Input() appHasPermissionMode: 'all' | 'any' = 'all';

  private readonly authService = inject(AuthService);
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      this.authService.session();
      this.render();
    });
  }

  private render(): void {
    const required = Array.isArray(this.required) ? this.required : [this.required];
    const scopes = this.authService.scopes();

    const canShow =
      this.appHasPermissionMode === 'any'
        ? required.some((scope) => scopes.includes(scope))
        : required.every((scope) => scopes.includes(scope));

    this.viewContainerRef.clear();

    if (canShow) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}