import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useStoreState } from "pullstate";
import { store } from "../../store";
import Option from "../../components/Option";

const Feature = ({ name, keyName, items }) => {
  const [choice, setChoice] = useState("");
  const [choiceCopy, setChoiceCopy] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  let order = useStoreState(store, s => s.order);
  let step = useStoreState(store, s => s.step);

  //ComponentDidMount() and ComponentShouldUpdate() Equivalent
  useEffect(() => {
    console.log(isDirty);
    if (!!choice === true) {
      let selectedChoice = items.filter(item => item.listItemID === choice);
      const { listTxt } = selectedChoice[0];
      setChoiceCopy(listTxt);
    }
  }, [choice, items, isDirty]);

  //Seleting an Option
  const onSelectChoice = e => {
    const value = Number(e.target.value);
    console.log(value);
    setChoice(value);
    store.update(s => {
      s.choice = value;
    });
    setIsDirty(true);
  };

  //React Router for Prev/Next buttons
  const history = useHistory();
  // const location = useLocation();

  //Need to create a prev state
  const clickedPrevHandler = () => {
    history.goBack();
  };
  let productList = useStoreState(store, s => s.products);
 
  //Clicking next
  const clickedNextHandler = () => {
    let reducedProductList = productList.filter(
      product => product[`${keyName}`] === choice
    );
    console.log(reducedProductList, 'reduced');
    store.update(s => {
      s.products = reducedProductList;
      s.step += 1;
    });

    console.log(store);
    console.log('step', step);
    setIsDirty(false);
    setChoice('')
    setChoiceCopy('')
    // history.push(`${location.pathname}/${order[step]}`);

    if (step > 9){
      history.push('summary')
    } else{
    history.push(`${order[step]}`);
    }
  };
  // console.log(name);

  if (step > 1){
      console.log('productList', productList);
      let values  = []
      productList.map(product => {
        if (!values[product[`${keyName}`]])
         values.push(product[`${keyName}`]);
      })
      console.log('VALID IDS', values);
      
    }
  
  return (
    <div>
      <p>QUESTION PLACEHOLDER, Please view the console {name}</p>
      {items.map(item => (
        <Option
          key={item.listItemID}
          name={name}
          value={item.listItemID}
          label={item.listItemValue}
          clicked={onSelectChoice}
        />
      ))}
      <p>image</p>
      <p>{choiceCopy}</p>
      <button onClick={clickedPrevHandler}>prev</button>
      <button disabled={!isDirty} onClick={clickedNextHandler}>
        next
      </button>
    </div>
  );
};

export default Feature;
