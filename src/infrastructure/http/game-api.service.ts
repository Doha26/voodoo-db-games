import axios from 'axios';
import { ExternalGameDto } from './types';

export class GameApiService {
  private readonly IOS_URL =
    'https://interview-marketing-eng-dev.s3.eu-west-1.amazonaws.com/ios.top100.json';
  private readonly ANDROID_URL =
    'https://interview-marketing-eng-dev.s3.eu-west-1.amazonaws.com/android.top100.json';

  async fetchGames(): Promise<{ iosGames: ExternalGameDto[]; androidGames: ExternalGameDto[] }> {
    const [iosResponse, androidResponse] = await Promise.all([
      axios.get(this.IOS_URL),
      axios.get(this.ANDROID_URL),
    ]);

    return {
      iosGames: iosResponse.data.flat(),
      androidGames: androidResponse.data.flat(),
    };
  }
}
