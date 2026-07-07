import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  private readonly http =
    inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:3000/analyze';

  analyze(
    subject: string,
    description: string
  ) {

    return this.http.post<any>(
      this.apiUrl,
      {
        subject,
        description
      }
    );

  }

}