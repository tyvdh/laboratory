import React from 'react';
import {connect} from 'react-redux';
import {EndpointPicker} from './EndpointPicker';
import {EndpointSetup} from './EndpointSetup';
import {EndpointResult} from './EndpointResult';
import {PubKeyPicker} from './FormComponents/PubKeyPicker';
import ImportXDR from './ImportXDR';
import TxBuilderAttributes from './TxBuilderAttributes';
import {
  updateAttributes,
  addOperation,
  removeOperation,
  updateOperation,
  reorderOperation,
} from '../actions/transactionBuilder';
import TxBuilderOperations from './TxBuilderOperations';
// import TxBuilderResult from './TxBuilderResult';
// import TxBuilderStore from '../stores/TxBuilderStore';

class TransactionBuilder extends React.Component {
  render() {
    let {dispatch} = this.props;
    let {
      attributes,
      operations,
    } = this.props.state;

    return <div className="TransactionBuilder">
      <div className="so-back">
        <div className="so-chunk">
          <TxBuilderAttributes
            attributes={attributes}
            onUpdate={onAttributeUpdate.bind(this, dispatch)} />
          <TxBuilderOperations
            operations={operations}
            onAddOp={() => dispatch(addOperation())}
            />
        </div>
      </div>
      <div className="so-back TransactionBuilder__result">
        <div className="so-chunk">
          {/*<TxBuilderResult />*/}
        </div>
      </div>
    </div>
  }
};

export default connect(chooseState)(TransactionBuilder);

function chooseState(state) {
  return {
    state: state.transactionBuilder,
  }
}

function onAttributeUpdate(dispatch, param, values) {
  let newAttributes = {};
  switch(param) {
  case 'sourceAccount':
    newAttributes.sourceAccount = values.value;
  break;
  case 'sequence':
    newAttributes.sequence = values.value;
    break;
  case 'fee':
    newAttributes.fee = values.value;
  break;
  case 'memo':
    newAttributes.memoType = values.type;
    newAttributes.memoContent = values.content;
  break;
  }
  dispatch(updateAttributes(newAttributes));
}
