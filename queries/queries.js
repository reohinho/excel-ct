import fetchData from "../helpers/fetchData";

/** 
 *  @Description For fetching records
 *  @query 

*/
// Home Page
const HomepageCT = `
    #graphql
    query HomePageCT($page: Int!) {
      CT (page:$page, limit: 25, sort: ["-count"]){
        Date
        count
        remark
        rate
        volume
        kV_a
        sedation
        sedatedBy
        injectionSite
        circumference
        urgent
        directPostContrast
        handInjection
        mixedContrast
        keywords
        PID
        radiographers
        radiologists
        nurses
        protocol
        pitch
        height
        weight
        ttp
        age
        inPatient
        kV_b
        delays
        contrastType
        ctdi
        examType
        IR
      }
    }
`;
const HomepageCTToday = `
    #graphql
    query HomePageCTToday($year: Float!, $month: Float!, $day: Float!) {
      CT ( limit: 25, filter: {
        _and: [
          {
            Date_func: {
              year: {
                _eq: $year
              }
            }
          },
          {
            Date_func: {
              month: {
                _eq: $month
              }
            }
          },
          {
            Date_func: {
              day: {
                _eq: $day
              }
            }
          },
        ]
      }){
        Date
        count
        remark
        rate
        volume
        kV_a
        sedation
        sedatedBy
        injectionSite
        circumference
        urgent
        directPostContrast
        handInjection
        mixedContrast
        keywords
        PID
        radiographers
        radiologists
        nurses
        protocol
        pitch
        height
        weight
        ttp
        age
        inPatient
        kV_b
        delays
        contrastType
        ctdi
        examType
        IR
      }
    }
`;
const HomepageCTNumber = `
    #graphql
    query HomePageCT {
      CT_aggregated {
        countDistinct {
          count
        }
      }
    }
`;
const HomepageData = `
    #graphql
    query HomepageData {
      radiologists: Radiologists {
        label
        value
      }
      protocol(limit: -1) {
        label
        value
        
      }
      radiographers {
        label
        value
      }
      nurses: Nurses  {
        
        label
        value
      }
    }
`;
// Message
const MessageData = `
    #graphql
    query MessageData {
      message (sort: ["-inputDate"]) {
        inputDate
        inputDate_func {
          year
          month
          day
        }
        effectiveDate
        effectiveDate_func {
          year
          month
          day
        }
        category
        inputUser
        originatedBy
        important
        active
        messageEditorState
        htmlMessage
        comments
      }
    }
`;
const MessageByID = `
    #graphql
    query MessageByID($MessageByIdId: ID!) {
      Message_by_id(id: $MessageByIdId) {
        id
        inputDate
        effectiveDate
        date_func {
          year
          day
          month
        }
        category
        inputUser
        originatedBy
        important
        active
        messageEditorState
        comments
      }
    }
`;
//Exam Detail
const ExamDetailsByID = `
    #graphql
    query ExamDetailsByID($ctByIdId: ID!) {
      CT_by_id(id:$ctByIdId) {
        Date
        Date_func {
          year
          month
          day
        }
        count
        remark
        rate
        volume
        kV_a
        sedation
        sedatedBy
        sedationMethod
        injectionSite
        circumference
        urgent
        directPostContrast
        handInjection
        mixedContrast
        keywords
        PID
        radiographers
        radiologists
        nurses
        protocol
        pitch
        height
        weight
        ttp
        age
        inPatient
        kV_b
        delays
        contrastType
        ctdi
        examType
        IR
      }
    }
`;
const ExamsRecordBySearch = `
    #graphql
    query ExamsRecordBySearch( $key: String!) {
      CT (search:$key, sort: ["sort", "-count"]) {
        Date
        Date_func {
          year
          month
          day
        }
        count
        remark
        rate
        volume
        kV_a
        sedation
        injectionSite
        circumference
        urgent
        directPostContrast
        handInjection
        mixedContrast
        keywords
        PID
        radiographers
        radiologists
        nurses
        protocol
        pitch
        height
        weight
        ttp
        age
        inPatient
        kV_b
        delays
        contrastType
        ctdi
        examType
        IR
  }
}
`;
//Cardiac Protocol
const CardiacSetupByID = `
    #graphql
    query CardiacSetupByID($cardiacCtByIdId: ID!) {
      cardiacCT_by_id(id: $cardiacCtByIdId) {
        id
        PID
        radiologistInCharge
        IVSite
        sedation
        breathingControl
        targetHR
        scanMode
        phase
        name
        protocol
        contrastRegime
        studyDose
        seriesDose
        seriesCTDI
        heartRate
        scanTechnique
        breathingControl
        depictionOfROI
        satisfaction
        artefact
        remarks
        delayTime
        date
        date_func {
          year
          day
          month
        }
      }
    }
`;
const CardiacSetupRecordBySearch = `
    #graphql
    query CardiacSetupRecordBySearch($key: String) {
      cardiacCT(search: $key, sort: ["sort", "-id"]) {
        id
        user_created
        user_updated
        PID
        name
        date_func {
          year
          month
          day
        }
        radiologistInCharge
        sedation
        breathingControl
        IVSite
        scanMode
        phase
        targetHR
      }
    }
`;
//Cardiac Case
const CardiacCaseRecordByID = `
    #graphql
    query CardiacCaseRecordByID($cardiacCtRecordByIdId: ID!) {
      Cardiac_CT_Record_by_id(id: $cardiacCtRecordByIdId) {
        id
        PID
        age
        date
        protocol
        contrastRegime
        studyDose
        seriesDose
        seriesCTDI
        heartRate
        scanTechnique
        breathingControl
        depictionOfROI
        satisfaction
        artefact
        remarks
        delayTime
      }
    }
    
`;
const CardiacCaseRecordBySearch = `
    #graphql
    query CardiacCaseRecordBySearch($key: String) {
      Cardiac_CT_Record(search: $key, sort: ["sort", "-id"]) {
        id
        PID
        age
        date
        protocol
        contrastRegime
        studyDose
        seriesDose
        seriesCTDI
        heartRate
        scanTechnique
        breathingControl
        depictionOfROI
        satisfaction
        artefact
        remarks
        delayTime
      }
    }
    
`;
//Home Page
export const getHomepageCT = async (page) => {
  const data = await fetchData(HomepageCT, {
    variables: { page: page },
  });

  return data.data.CT;
};
export const getHomepageCTToday = async (year, month, day) => {
  const data = await fetchData(HomepageCTToday, {
    variables: {year: year, month: month, day: day },
  });

  return data.data.CT;
};

export const getHomepageCTNumber = async () => {
  const data = await fetchData(HomepageCTNumber, {
    variables: {},
  });

  return data.data.CT_aggregated[0].countDistinct.count;
};

export const getHomepageData = async () => {
  const data = await fetchData(HomepageData, {
    variables: {},
  });
  return data.data;
};
//Message
export const getMessageData = async () => {
  const data = await fetchData(MessageData, {
    variables: {},
  });
  return data.data.message;
};
export const getMessageByID = async (MessageByIdId) => {
  const data = await fetchData(MessageByID, {
    variables: { MessageByIdId: MessageByIdId },
  });

  return data.data;
};
//Exam Detail
export const getExamDetailsByID = async (ctByIdId) => {
  const data = await fetchData(ExamDetailsByID, {
    variables: { ctByIdId: ctByIdId },
  });

  return data.data;
};
export const getExamsRecordBySearch = async (key) => {
  const data = await fetchData(ExamsRecordBySearch, {
    variables: { key: key },
  });
  console.log("in queries", data);
  return data.data;
};
//Cardiac Protocol
export const getCardiacSetupByID = async (cardiacCtByIdId) => {
  const data = await fetchData(CardiacSetupByID, {
    variables: { cardiacCtByIdId: cardiacCtByIdId },
  });

  return data.data;
};
export const getCardiacSetupRecordBySearch = async (key) => {
  const data = await fetchData(CardiacSetupRecordBySearch, {
    variables: { key: key },
  });
  return data.data;
};
//Cardiac Case Record
export const getCardiacCaseRecordByID = async (ExamId) => {
  const data = await fetchData(CardiacCaseRecordByID, {
    variables: { cardiacCtRecordByIdId: ExamId },
  });

  return data.data;
};
export const getCardiacCaseRecordBySearch = async (key) => {
  const data = await fetchData(CardiacCaseRecordBySearch, {
    variables: { key: key },
  });
  return data.data;
};
