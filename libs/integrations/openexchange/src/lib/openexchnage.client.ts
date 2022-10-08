import axios, { AxiosInstance } from 'axios';
import { OpenexchangeClientConfigType } from './types';
import { RatesResponse } from './types/external/rates';

export class OpenexchangeClient {
  private readonly url;
  private readonly apiKey;
  protected readonly httpService: AxiosInstance;

  static create(config: OpenexchangeClientConfigType) {
    return new this(config);
  }

  constructor(config: OpenexchangeClientConfigType) {
    this.url = config.baseUrl;
    this.apiKey = config.apiKey;
    this.httpService = axios.create({
      baseURL: this.url,
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getDayRate(
    date: Date
  ): Promise<RatesResponse> {
    try {
      const response = await this.httpService.get('historical/' + date.toISOString().slice(0,10) + '.json', { params: { app_id: this.apiKey, show_alternative: false, prettyprint: false } });
      return response.data;
    } catch (error) {
      throw new Error(
        `Error - Openexchange Integration - getDayRate - ${error}`
      );
    }
  }

}
