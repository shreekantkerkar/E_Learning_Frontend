import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext"; 
import Accordion from "./Accordian";

const BEContent = () => {
  const [semester7Subjects, setSemester7Subjects] = useState([]);
  const [semester8Subjects, setSemester8Subjects] = useState([]);
  const { isLoggedIn } = useUser(); 

  useEffect(() => {
    axios
      .get("https://e-learning-backend-28nz.onrender.com/api/v1/getSubjects")
      .then((response) => {
        
        const semester7FilteredSubjects = response.data.filter(subject => subject.semesters === 41);
        setSemester7Subjects(semester7FilteredSubjects);
        
        const semester8FilteredSubjects = response.data.filter(subject => subject.semesters === 42);
        setSemester8Subjects(semester8FilteredSubjects);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      });
  }, []);

  return (
    <div className="p-10 font-[Poppins] mt-20">
      <div className="w-6/12 mx-auto my-4">
        <h2 className="text-4xl p-4 text-center font-extrabold mb-4">
          Semester 7 Subjects
        </h2>
        {semester7Subjects.map((subject) => (
          <Accordion
            key={subject._id}
            title={subject.subName}
            chapters={subject.chapters}
            subjectId={subject._id}
          >
            {isLoggedIn && (
              <Link
                to={`/addChapter/${subject._id}`}
                className="inline-block w-full h-full px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 mr-4"
              >
                Add Chapter
              </Link>
            )}
          </Accordion>
        ))}

        <h2 className="text-4xl p-4 text-center font-extrabold mb-4">
          Semester 8 Subjects
        </h2>
        {semester8Subjects.map((subject) => (
          <Accordion
            key={subject._id}
            title={subject.subName}
            chapters={subject.chapters}
            subjectId={subject._id}
          >
            {isLoggedIn && (
              <Link
                to={`/addChapter/${subject._id}`}
                className="inline-block w-full h-full px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 mr-4"
              >
                Add Chapter
              </Link>
            )}
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default BEContent;
