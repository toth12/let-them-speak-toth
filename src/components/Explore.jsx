import React from "react";
import Hero from "./Hero";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";

const Explore = (props) => {
  ReactGA.pageview("/explore");

  return (
    <div>
      <Hero text="Testimonies" />
      <div className="container">
        <p>
          In addition to search, a traditional table of contents supports the exploration of interviews. Upon clicking on the Explore button, you find the list of all testimonies, in other words a table of contents, that this project incorporates. Below you find further information on testimony transcripts and how you can browse them.
        <br />
        <br />
        </p>
        <div className="center-text">
          <Link className="button brown" to="/contents">
            Let's explore
          </Link>
        </div>
        <p>
          <br />
          <br />
          The table of contents leads you to complete transcripts, and to the listening or watching some but not all interviews.  Transcripts are not fully accurate; they might feature occasional errors, omissions, odd formatting and deviations from the original audio / video tapes. The goal of a data edition is not to produce a completely accurate publication of data. Due to the volume of testimonies data and the fact that interviews were recorded and transcribed by many different projects using different and not always consistent transcription standards, this project cannot offer complete accuracy. In addition to transcript errors, historical inaccuracies may also be present as testimonies are personal recollections and reflections of individual survivors and witnesses. Please take this into consideration when reading transcripts and contact the editor with suggestions for improvement. You can read more about how transcripts were prepared and processed so that they can be included into this edition in the {" "} <a href="/methods">Methodology</a> section.
        </p>
        <p>
          On the left hand side, you find a search bar that helps you to focus on certain groups of interviews and interviewees. For instance, you can find interviews by men and women or interviewees that talk about certain camps and ghettos. How biodata about interviewees ( shared by the Yale Fortunoff Archive, the USC Shoah Foundation, and the United States Holocaust Memorial) was pre-processed is also described in the <a href="/methods">Methodology</a> section. In addition to the search bar that enables you to find certain groups of interviewees and interviews in an interactive way, a number of computer generated data files help you further explore the interviews presented in this edition. These data files are presented below.
          <br />
          <br />
        </p>
        <p>
        <br />
        <br />
        <h2>Computer generated data files</h2>
        </p>
        <p>
        <b>1. List of all interviews in this edition</b>
        <br />
        <a href="https://github.com/yale-fortunoff/lts-data/blob/data-files-first-milestone/data/all_interviews_with_titles_shelfmarks.csv" target="_blank">Here</a> you can find the list of all interviews, their titles, and shelf marks.
        </p>

        <p>
        <b>2. Interviewees giving more interviews</b>
        <br />
        Reading different testimonies by the same person is of great interest. In <a href="https://github.com/yale-fortunoff/lts-data/blob/data-files-first-milestone/data/interviewees_giving_more_interviews.csv" target="_blank">this</a> data file, you can find the list of those interviewees who are present in this edition with multiple testimonies.
        </p>

        <p>
        <b>3. Names of interviewees ordered by surnames</b>
        <br />
        The interactive search bar does not enable you to find interviewees in terms of their surnames (the reason is described in the <a href="/methods">Methodology</a> section); <a href="https://github.com/yale-fortunoff/lts-data/blob/data-files-first-milestone/data/interviewee_ordered_by_surnames.csv" target="_blank">here</a> you can download a list of interviewees with their surnames as a different field. Since surnames were identified with a computational approach, they are not always completely accurate. 
        </p>

        <p>
        <b>4. Interviewees who perhaps come from the same family</b>
        <br />
        Brothers, sisters, wives and husbands sometimes gave interviews; identifying interviewees, who come from the same family is a difficult task, though finding them might be of great interest for the research community. <a href="https://github.com/yale-fortunoff/lts-data/blob/data-files-first-milestone/data/interviews_sharing_surnames.csv" target="_blank">Here</a>
        , you can find a list of interviewees who shared the same surname (how their surnames were identified is described in the <a href="/methods">Methodology</a> section)). Of course, sharing surnames (especially very common ones such as Friedman and Cohn) does not necessarily mean family relations. The list is therefore only indicative and definitely not comprehensive.
        </p>

        <p>
        <b>5. Interviews with multiple persons</b>
        <br />
        Some of the interviews presented in this edition are not testimonies by one person; in these testimonies, interviewers talk to multiple victims. <a href="https://github.com/yale-fortunoff/lts-data/blob/data-files-first-milestone/data/interviews_with_multiple_interviewees.csv" target="_blank">Here</a> you can find a list of these interviews.
        </p>

        <p>
        <b>6. Interviewees who went to hide or fled before deportations</b>
        <br />
        Several interviewees who speak in this edition did not go through deportations to concentration camps or managed to flee before the arrival of the Nazis. There is no direct way to identify them. In the following two data files, you can find those interviews that are not associated with any ghetto or concentration camp.
        <br/> 
        - <a href="https://github.com/yale-fortunoff/lts-data/blob/data-files-first-milestone/data/interviews_without_ghettos.csv" target="_blank">Interviews without ghetto information</a>
         <br/> 
        - <a href="https://github.com/yale-fortunoff/lts-data/blob/data-files-first-milestone/data/interviews_without_camps.csv" target="_blank">Interviews without camp information</a>
         <br/> 
        The absence of ghetto and camp information can be a good indicator that the person went to hide or flee. However, the two lists are not always accurate since they were created with computational tools, which could not always identify ghetto and camp informaton (see more about this in the <a href="/methods">Methodology</a> section).      
        </p>


        
      </div>
    </div>
  );
};

export default Explore;
