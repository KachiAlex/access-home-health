import { Injectable } from '@nestjs/common';
import { sampleOrders, sampleShipments } from '../../shared/sample-data';

@Injectable()
export class OrdersService {
  listOrders() {
    return sampleOrders;
  }

  listShipments() {
    return sampleShipments;
  }
}
