import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

const defaultValues = {
  username: "",
  email: ""
};

const isClearable = true;

const subjects = [
  {value: 'math', label: 'Math'},
  {value: 'science', label: 'Science'},
  {value: 'art', label: 'Art'},
  {value: 'language-arts', label: 'Language Arts'}
];

const topics = {
    'math': {
      topics: [
        {value: 'algebra', label: 'Algebra'},
        {value: 'trigonometry', label: 'Trigonometry'},
        {value: 'calculus', label: 'Calculus'},
      ]
    },
    'science': {
      topics: [
        {value: 'physics', label: 'Physics'},
        {value: 'chemistry', label: 'Chemistry'},
        {value: 'biology', label: 'Biology'},
      ]
    },
    'art': {
      topics: [
        {value: 'art-history', label: 'Art History'},
        {value: 'painting', label: 'Painting'},
        {value: 'drawing', label: 'Drawing'},
      ]
    },
    'language-arts': {
      topics: [
        {value: 'literature', label: 'Literature'},
        {value: 'grammar', label: 'Grammar'},
        {value: 'writing', label: 'Writing'},
      ]
    }
  };

  const timeslots = {
    'algebra': {
      timeslots: [
        {value: 8, label: '8:00 AM'},
        {value: 11, label: '11:00 AM'}
      ]
    },
    'trigonometry': {
      timeslots: [
        {value: 9, label: '9:00 AM'},
        {value: 12, label: '12:00 PM'}
      ]
    },
    'calculus': {
      timeslots: [
        {value: 8, label: '10:00 AM'},
        {value: 15, label: '3:00 PM'}
      ]
    },
    'physics': {
      timeslots: [
        {value: 8, label: '10:00 AM'},
        {value: 15, label: '3:00 PM'}
      ]
    },
    'chemistry': {
      timeslots: [
        {value: 8, label: '9:00 AM'},
        {value: 15, label: '1:00 PM'}
      ]
    },
    'biology': {
      timeslots: [
        {value: 8, label: '8:00 AM'},
        {value: 15, label: '10:00 AM'}
      ]
    },
    'art-history': {
      timeslots: [
        {value: 11, label: '11:00 AM'}
      ]
    },
    'painting': {
      timeslots: [
        {value: 14, label: '2:00 PM'}
      ]
    },
    'drawing': {
      timeslots: [
        {value: 8, label: '8:00 AM'},
        {value: 5, label: '5:00 AM'}
      ]
    },
    'literature': {
      timeslots: [
        {value: 8.5, label: '8:30 AM'},
        {value: 11.75, label: '11:45 AM'}
      ]
    },
    'grammar': {
      timeslots: [
        {value: 8, label: '8:00 AM'},
        {value: 9, label: '9:00 AM'},
        {value: 10, label: '10:00 AM'},
        {value: 11, label: '11:00 AM'},
        {value: 13, label: '1:00 PM'}
      ]
    },
    'writing': {
      timeslots: [
        {value: 8, label: '8:00 AM'},
        {value: 11, label: '11:00 AM'}
      ]
    },
  };

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    borderBottom: '1px dotted pink',
    color: state.selectProps.menuColor,
    padding: 20,
  }),

  control: (_, { selectProps: { width }}) => ({
    width: width
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

function Form() {
  // const { register, watch, handleSubmit, formState, control, unregister} = useForm({
  //   mode: "onChange"
  // });

  const subjectRef = useRef(null);
  const topicRef = useRef(null);
  const timeSlotRef = useRef(null);

  const addClass = (data) => {
    console.log('adding slot');
    console.log(data);
  }

  // const { isValid, isDirty } = formState;
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);

  const [selectedSubject, setSelectedSubject] = useState(null);

  const [selectedTopic, setSelectedTopic] = useState(null);

  const [selectedTimeslot, setSelectedTimeslot] = useState(null);

  const subjectPicked = (event) => {
    console.log('subject changed');
    console.log(event.value);
    setSelectedTopic(null);
    setSelectedTimeslot(null);
    subjectRef.current = event.value;
    setSelectedSubject(event.value);
  }

  const topicPicked = (event) => {
    console.log('topic changed');
    console.log(event.value);
    setSelectedTimeslot(null);
    topicRef.current = event.value;
    setSelectedTopic(event.value);
  }

  const timeSlotPicked = (event) => {
    console.log('timeslot changed');
    timeSlotRef.current = event.value;
    setSelectedTimeslot(event.value);
  }

  useEffect(() => {
    // Update the document title using the browser API
    console.log('unmounting');
    console.log('selectedSubject', selectedSubject);
    console.log('selectedTopic', selectedTopic);
    console.log('selectedTimeslot', selectedTimeslot);
    // if (subjectRef.current !== selectedSubject) {
    //   setSelectedTopic(null);
    //   setSelectedTimeslot(null);
    //   topicRef.current = null;
    //   timeSlotRef.current = null;
    // }
    // if (topicRef.current !== selectedTopic) {
    //   setSelectedTimeslot(null);
    //   timeSlotRef.current = null;
    // }
  });

  return (
    <div className="Form">
      Add Class
      <form onSubmit={addClass} className="form">
        <section>
          <label>Username:
            <input onChange={e => setUsername(e.target.value)} defaultValue={username} />
            {/* {formState.errors.username?.type === 'required' && <span>This field is required</span>}
            {formState.errors.username?.type === 'pattern' && <span>Username should be alphanumeric only</span>} */}
          </label>
          {/* <Controller name="username" render={({ field }) => <input {...field} />} /> */}

          <label>Email:
            <input onChange={e => setEmail(e.target.value)} defaultValue={email} />
            {/* {formState.errors.email?.type === 'required' && <span>This field is required</span>}
            {formState.errors.email?.type === 'pattern' && <span>Invalid email</span>} */}
          </label>
        </section>
        <section>
          <label>Subject:
            <Select 
              options={subjects} 
              onChange={subjectPicked}
              defaultValue = {selectedSubject}
            />
          </label>
        </section>
        <section>
          <label>Topic:
            <Select 
              options={topics[selectedSubject]?.topics}
              onChange={topicPicked}
              defaultValue = {selectedTopic}
            />
          </label>
        </section>
        <section>
          <label>Timeslot:
            <Select 
              options={timeslots[selectedTopic]?.timeslots}
              onChange={timeSlotPicked}
              defaultValue = {selectedTimeslot}
            />
          </label>
        </section>
        <input type="submit" value="Add Class"/>
      </form>
    </div>
  );
}

export default Form;
