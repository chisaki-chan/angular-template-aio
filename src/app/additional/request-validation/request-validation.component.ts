import { Component } from '@angular/core';
import { MainService } from 'src/app/core/services/main.service';
import { getSearchParams } from 'src/app/utils/search-params';
import { environment } from 'src/environments/environment';

interface IEncryptedValidation {
  validatorName: string;
  creatorName: string;
  ticket_name: string;
  type: string;
  creation_date: string;
  department_name: string;
  background: string;
  background_what: string;
  background_who: string;
  background_when: string;
  background_where: string;
  background_why: string;
  background_how: string;
  issue_description: string;
  business_impact: string;
  status: 'Open' | 'Completed';
  state: 'Approve' | 'Refused';
  validation_date: string;
}

interface ResponseEncryptedValidation {
  status: boolean;
  data: IEncryptedValidation;
}

@Component({
  selector: 'app-request-validation',
  templateUrl: './request-validation.component.html',
  styleUrl: './request-validation.component.scss',
})
export class RequestValidationComponent {
  searchParams: Record<string, string> = {};
  formValues = {
    comment_validation: '',
    comment_submission: '',
    user_id_validate: '',
  };
  isValidated?: boolean = false;
  data?: IEncryptedValidation = undefined;
  FEAT_API_URL = `${environment.apiUrl}/request/encrypted-validation`;
  currentDate = new Date().toISOString();

  constructor(
    public mainservice: MainService,
  ) {}
  
  async getData() {
    const response = await fetch(`${this.FEAT_API_URL}?value=${this.searchParams['value']}`);
    const data: ResponseEncryptedValidation = await response.json();
    if (data.status) {
      this.data = data.data;
      this.isValidated = data.data.status === 'Completed';
    }
  }

  async ngOnInit() {
    this.searchParams = getSearchParams();
    await this.getData();
  }

  async handleSubmit(state: 'Approve' | 'Refused') {
    const body = { state, comment_validation: this.formValues.comment_validation };
    const response = await fetch(`${this.FEAT_API_URL}?value=${this.searchParams['value']}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      this.isValidated = true;
      await this.getData();
    }
  }

  handleFormChange(event: any) {
    const name = event.target.name as keyof typeof this.formValues;
    this.formValues[name] = event.target.value;
  }
}
