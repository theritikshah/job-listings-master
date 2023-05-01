import React, { useState } from "react";
import styles from "./JobCard.module.scss";

const JobCard = ({ jobDetails: job, setFilter, filter }) => {
  return (
    <div
      className={styles.job_body}
      style={
        (job.featured && { borderLeft: "6px solid hsl(180, 29%, 50%)" }) || {}
      }
    >
      <div className={styles.job_info}>
        <img src={job.logo} alt="" className={styles.brand_logo} />
        <div className={styles.job_description}>
          <div className={styles.info_chips}>
            <span className={styles.company_name}>{job.company}</span>
            {job.new && (
              <span
                className={`${styles.chip} ${styles.new}`}
                onClick={() => {
                  if (filter.includes("new")) {
                    console.log(filter);

                    return;
                  }
                  setFilter((preFilters) => {
                    return [...preFilters, "new"];
                  });
                }}
              >
                {"NEW!"}
              </span>
            )}
            {job.featured && (
              <span
                className={`${styles.chip} ${styles.featured}`}
                onClick={() => {
                  if (filter.includes("featured")) {
                    console.log(filter);

                    return;
                  }
                  setFilter((preFilters) => {
                    return [...preFilters, "featured"];
                  });
                }}
              >
                {"FEATURED"}
              </span>
            )}
          </div>
          <h2 className={styles.job_position}>{job.position}</h2>
          <ul className={styles.job_position_description}>
            <li>{job.postedAt}</li>
            <li>{job.contract}</li>
            <li>{job.location}</li>
          </ul>
        </div>
      </div>
      <div className={styles.job_tags}>
        {[job.role, job.level, ...job.languages, ...job.tools].map(
          (language) => {
            return (
              <span
                key={language}
                onClick={() => {
                  if (filter.includes(language)) {
                    console.log(filter);

                    return;
                  }
                  setFilter((preFilters) => {
                    return [...preFilters, language];
                  });
                }}
              >
                {language}
              </span>
            );
          }
        )}
      </div>
    </div>
  );
};

export default JobCard;
