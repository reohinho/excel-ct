import { useMutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
// need custom date scalar?
// change type to contrastType?
const submitCaseMutation = gql`
  mutation SubmitCase(
    $PID: String!,
    $inPatient: Boolean,
    $age: Number!,
    $weight: Float,
    $height: Float,
    $circumference: Float,
    $date: String!,
    $urgent: Boolean,
    $sedation: Boolean,
    $protocol: [String!],
    $kV_A: String!,
    $kV_B: String,
    $pitch: Float!,
    $route: String,
    $handInjection: Boolean,
    $mixedContrast: Boolean,
    $type: String,
    $rate: Float,
    $volume: Float,
    $pre: Boolean,
    $ttp: Float,
    $delay1: Float,
    $delay2: Float,
    $delay3: Float,
    $delay4: Float,
    $radiographers: [String!],
    $radiologists: [String],
    $nurses: [String],
    $keyword: String,
    $remark: String,
  ) 
  {
    submitCase(
      PID: $PID, 
      inPatient: $inPatient,
      age: $age,
      weight: $weight,
      height: $height,
      circumference: $circumference,
      date: $date,
      urgent: urgent,
      sedation: $sedation,
      protocol: $protocol,
      kV_A: $kV_A,
      kV_B: $kV_B,
      pitch: $pitch,
      route: $route,
      handInjection: $handInjection,
      mixedContrast: $mixedContrast,
      type: $type,
      rate: $rate,
      volume: $volume,
      pre: $pre,
      ttp: $ttp,
      delay1: $delay1,
      delay2: $delay2,
      delay3: $delay3,
      delay4: $delay4,
      radiographers: $radiographers,
      radiologists:  $radiologists,
      nurses:  $nurses,
      keyword: $keyword,
      remark:  $remark,
      ) 
      {
      path
      message
    }
  }
`;

const submitCaseContainer = (props) => {
  const [mutate] = useMutation(submitCaseMutation);

  async function submit(values) {
    const { data } = await mutate({
      variables: values,
    });
    if (data) {
      return data.submitCase;
    }
    return null;
  }

  function onFinish() {
    props.history.push("/");
  }

  return props.children({ submit, onFinish });
};

export default withRouter(submitCaseContainer);
