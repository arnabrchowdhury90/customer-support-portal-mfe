import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeLoaderService {

  private readonly http =
    inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:3000/knowledge';

  async load(name: string): Promise<string> {

    try {

      const response = await firstValueFrom(
        this.http.get<{
          success: boolean;
          content: string;
        }>(
          `${this.apiUrl}/${name}`
        )
      );

      return response.content;

    } catch (error) {

      console.error(error);

      return `Knowledge file not found: ${name}`;

    }

  }

}