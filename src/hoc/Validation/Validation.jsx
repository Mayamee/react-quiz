const Validation = ({ rule, children: item }) => {
  console.log(item.props.value);
  //TODO MAYBE CALLBACK?
  // cb(true/false);
  console.log(rule);
  return item;
};

export default Validation;
//TODO add some field or callback to make validation
