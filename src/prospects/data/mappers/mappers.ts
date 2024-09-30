import {ProspectsModel} from '../models/prospectsModel';
import {ProspectsEntity} from '../remote/entities/prospectsEntity';

export function mapProspectsData(itemFromApi: ProspectsEntity): ProspectsModel {
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
