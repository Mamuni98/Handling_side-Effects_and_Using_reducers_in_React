import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default Input;
// ref={amountInputRef}
//         label='Amount'
//         input={{
//           id: 'amount_' + props.id,
//           type: 'text',
//           min: '1',
//           max: '5',
//           step: '1',
//           defaultValue: '1',
//         }}
// const Input = React.forwardRef((props, ref) => {
//   return (
//     <div className={classes.input}>
//       <label htmlFor={props.input.id}>{props.label}</label>
//       <input ref={ref} {...props.input} />
//     </div>
//   );
// });

// export default Input;
