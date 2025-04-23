import React from 'react';
import './heading.css';
interface Props {
    type: string;
    text: string;
}
const Heading: React.FC<Props> = (props) => {
    const { type, text } = props;
    return <p className={`heading-${type}`}>{text}</p>;
};
export default Heading;
