import {LeadsModel} from '../models/leadsModel';
import {LeadsEntity} from '../remote/entities/leadsEntity';

export function mapLeadsData(itemFromApi: LeadsEntity): LeadsModel {
  return {
    id: itemFromApi.id,
    nationalId: itemFromApi.nationalId,
    firstName: itemFromApi.firstName,
    lastName: itemFromApi.lastName,
    birthDate: itemFromApi.birthDate,
    email: itemFromApi.email,
    status: itemFromApi.status,
    validationResults: {
      nationalRegistryCheck:
        itemFromApi.validationResults.nationalRegistryCheck || null,
      judicialRecordsCheck:
        itemFromApi.validationResults.judicialRecordsCheck || null,
      prospectQualificationScore:
        itemFromApi.validationResults.prospectQualificationScore || null,
    },
    qualifiedAt: itemFromApi.qualifiedAt,
  };
}
