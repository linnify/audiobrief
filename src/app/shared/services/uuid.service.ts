import {Injectable} from '@angular/core';
import {UUID} from '../types/uuid';

@Injectable({
  providedIn: 'root'
})
export class UuidService {

  public generate(): string {
    return UUID.UUID();
  }
}
