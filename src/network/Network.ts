import { INetworkRequest } from '../interfaces/interfaces';
import { Types } from '../types/types';
import { injectable } from 'inversify';
import UserAction = Types.UserAction;
import { observable } from 'mobx';

type Currency = Types.Currency;
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

@injectable()
export class NetworkRequest implements INetworkRequest<Response> {

  token: string = ''
  url: string = ''

  @observable
  public balance = 0

  @observable
  public currency: Currency = 'USD'

  public nextActions: UserAction[] = []

  async fetch(): Promise<Response | void> {
    // eslint-disable-next-line no-restricted-globals
    const { protocol } = location
    this.url = `${protocol}//server.localhost:8080/users`
    await fetch(this.url)
      .then(result => result.json())
      .then((response: NetworkRequest) => this.parseResponse(response))
      .catch((err: any) => {
        throw new Error(`${err}`)
      })
  }

  getFetchOptions(method: HttpMethod): RequestInit {
    return {
      method,
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin':  '*' ,
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': '*',
      },
    }
  }

  parseResponse({ currency, balance, nextActions, token }: NetworkRequest): void {
    if (!Array.isArray(nextActions) || currency?.length < 2 || !balance || !token) {
      throw new Error(`response data is incorrect ${nextActions} || ${currency} || ${balance}`)
    }
    this.nextActions = nextActions
    this.currency = currency
    this.balance = balance
    this.token = token
  }

}