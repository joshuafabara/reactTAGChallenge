import React, { useState, useEffect } from "react";
import Select from "react-select";
import Schedule from '../Schedule/Schedule';

const staticSubjects = [
  {value: 'math', label: 'Math'},
  {value: 'science', label: 'Science'},
  {value: 'art', label: 'Art'},
  {value: 'language-arts', label: 'Language Arts'}
];

const staticTopics = {
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

  const staticTimeslots = {
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
        {value: 10, label: '10:00 AM'},
        {value: 15, label: '3:00 PM'}
      ]
    },
    'physics': {
      timeslots: [
        {value: 10, label: '10:00 AM'},
        {value: 15, label: '3:00 PM'}
      ]
    },
    'chemistry': {
      timeslots: [
        {value: 9, label: '9:00 AM'},
        {value: 13, label: '1:00 PM'}
      ]
    },
    'biology': {
      timeslots: [
        {value: 8, label: '8:00 AM'},
        {value: 10, label: '10:00 AM'}
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

  const alphaNumRegex = /^[a-z0-9]+$/i;
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

function Form() {
  const addClass = (event) => {
    event.preventDefault();
    console.log('adding slot');
    let innerSchedule = schedule;
    innerSchedule = [...innerSchedule, {'subject': selectedSubject.label, 'topic': selectedTopic.label, 'timeslot': selectedTimeslot.label, 'weight': selectedTimeslot.value}];
    innerSchedule.sort(function(a, b) {
      return a.weight - b.weight;
    });
    console.log('innerSchedule: ', innerSchedule);
    setSchedule(innerSchedule);
    setSelectedSubject(null);
    setSelectedTopic(null);
    setSelectedTimeslot(null);
  }

  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');

  const [selectedSubject, setSelectedSubject] = useState(null);

  const [selectedTopic, setSelectedTopic] = useState(null);

  const [selectedTimeslot, setSelectedTimeslot] = useState(null);

  const [subjects, setSubjects] = useState([...staticSubjects]);

  const [topics, setTopics] = useState({...staticTopics});

  const [timeslots, setTimeslots] = useState({...staticTimeslots});

  const [schedule, setSchedule] = useState([]);

  const [studentID, setStudentID] = useState(null);

  const [validUsername, setValidUsername] = useState(false);

  const [validEmail, setValidEmail] = useState(false);

  const subjectPicked = (event) => {
    if (event.value !== selectedSubject?.value) {
      console.log('subject changed');
      console.log(event.value);
      setSelectedTopic(null);
      setSelectedTimeslot(null);
      console.log('selectedOption Value', subjects.find(subject => subject.value === event.value));
      setSelectedSubject(subjects.find(subject => subject.value === event.value));
    }
  }

  const topicPicked = (event) => {
    if (event.value !== selectedTopic?.value) {
      console.log('topic changed');
      setSelectedTimeslot(null);
      console.log('selected topic after pick', topics[selectedSubject.value]?.topics?.find(topic => topic.value === event.value));
      setSelectedTopic(topics[selectedSubject.value]?.topics?.find(topic => topic.value === event.value));
    }
  }

  const timeSlotPicked = (event) => {
    if (event.value !== selectedTimeslot?.value) {
      console.log('timeslot changed');
      console.log('selected timeslot after pick', timeslots[selectedTopic.value]?.timeslots?.find(timeslot => timeslot.value === event.value));
      setSelectedTimeslot(timeslots[selectedTopic.value]?.timeslots?.find(timeslot => timeslot.value === event.value));
    }
  }

  const usernameOnBlur = (event) => {
    if (username !== (event.target.value).trim()) {
      if ((event.target.value).trim().match(alphaNumRegex)) {
        setValidUsername(true);
        setUsername((event.target.value).trim());
        setStudentID(new Date().getTime());
        setSelectedSubject(null);
        setSelectedTopic(null);
        setSelectedTimeslot(null);
        setSchedule([]);
      } else {
        setValidUsername(false);
      }
    }
    console.log(`usernameOnBlur: ${event.target.value}`, event.target.value)
  }

  const emailOnBlur = (event) => {
    if (email !== (event.target.value).trim()) {
      if ((event.target.value).trim().match(emailRegex)) {
        setValidEmail(true);
        setEmail(event.target.value.trim());
        setSelectedSubject(null);
        setSelectedTopic(null);
        setSelectedTimeslot(null);
      } else {
        setValidEmail(false);
      }
    }
    console.log(`emailOnBlur: ${event.target.value}`, event.target.value)
  }

  useEffect(() => {
    console.log('selectedSubject', selectedSubject);
    console.log('selectedTopic', selectedTopic);
    console.log('selectedTimeslot', selectedTimeslot);
    console.log('validUsername', validUsername);
    console.log('validEmail', validEmail);
  });

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      color: state.selectProps.menuColor,
      padding: 20,
    }),
  }

  return (
    <div className="Form">
      Add Class
      <form onSubmit={addClass} className="form">
        <section>
          <label>Username:
            <input onBlur={usernameOnBlur} defaultValue={username} />
          </label>
          {/* <Controller name="username" render={({ field }) => <input {...field} />} /> */}

          <label>Email:
            <input onBlur={emailOnBlur} defaultValue={email} />
          </label>
          {(!validUsername) &&
            <div className='inputs-hints'>
              <small>Username should be alphanumeric</small>
            </div>
          }
          {(!validEmail) &&
            <div className='inputs-hints'>
              <small>Enter a valid email</small>
            </div>
          }
        </section>
        <section>
          <label>Subject:
            <Select
              styles={customStyles}
              options={subjects}
              defaultValue=""
              menuColor='grey'
              value={selectedSubject}
              onChange={subjectPicked}
            />
          </label>
        </section>
        <section>
          <label>Topic:
            <Select
              styles={customStyles}
              options={topics[selectedSubject?.value]?.topics}
              defaultValue=""
              menuColor='grey'
              value={selectedTopic}
              onChange={topicPicked}
            />
          </label>
        </section>
        <section>
          <label>Timeslot:
            <Select
              styles={customStyles}  
              options={timeslots[selectedTopic?.value]?.timeslots}
              defaultValue=""
              menuColor='grey'
              value={selectedTimeslot}
              onChange={timeSlotPicked}
            />
          </label>
        </section>
        <input disabled={(!validUsername || !validEmail || !selectedSubject || !selectedTopic || !selectedTimeslot)} type="submit" value="Add Class"/>
        {/* <input disabled={(!isValid || !isDirty)} type="submit" value="Add Class"/> */}
      </form>
      {schedule.length > 0 &&
        <Schedule username={username} email={email} studentID={studentID} schedule={schedule} />
      }
    </div>
  );
}

export default Form;
