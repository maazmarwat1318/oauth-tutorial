import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { TokenService } from './tokenholderservice';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  title = 'oauth-tutorial';
  code: string | null = null;
  constructor(
    private _httpClient: HttpClient,
    private _activatedRoute: ActivatedRoute,
    private _tokenService: TokenService
  ) {
    this.code =
      this.parseFragment(_activatedRoute.snapshot.fragment ?? '')[
        'access_token'
      ] ?? null;
    console.log('Code: ', this.code);
    if (this.code) _tokenService.setToken(this.code);
  }
  authTokenRequestUrl = encodeURI(
    `${environment.oAuthUrl}?scope=https://www.googleapis.com/auth/gmail.readonly&prompt=consent&redirect_uri=http://localhost:4200/&response_type=token&client_id=${environment.oAuthClientId}`
  );

  private parseFragment(fragment: string): Record<string, string | null> {
    const params = new URLSearchParams(fragment);
    const result: Record<string, string | null> = {};
    for (const [key, value] of params.entries()) {
      result[key] = value;
    }
    return result;
  }
}
