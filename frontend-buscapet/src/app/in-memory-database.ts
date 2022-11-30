import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { Observable } from "rxjs";
import { Vaccine } from "./pages/vaccines/shared/vaccine.model";

export class InMemoryDatabase implements InMemoryDbService {
  createDb(reqInfo?: RequestInfo | undefined): {} | Observable<{}> | Promise<{}> {
    const vaccines: Vaccine[] = [
      { id: 1, name: 'Raiva' },
      { id: 2, name: 'V10' },
      { id: 3, name: 'V8' }
    ];

    return { vaccines }
  }
}
