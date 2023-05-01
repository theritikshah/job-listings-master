import { useEffect, useState } from "react";
import "./App.css";
import styles from "./App.module.scss";
import JobCard from "./Components/JobCard";

function App() {
  const [jobs, setJobs] = useState();
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    fetch("/data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => setJobs(res))
      .catch((err) => console.log(err));
  }, []);

  const filteredJobs =
    jobs &&
    jobs.filter((job) => {
      if (filter.length === 0) {
        return true;
      } else {
        return filter.every(
          (filterItem) =>
            [...job.languages, ...job.tools, job.role, job.level].includes(
              filterItem
            ) ||
            (job.new && filterItem === "new") ||
            (job.featured && filterItem === "featured")
        );
      }
    });

  return (
    <div className={styles.App}>
      <header>
        <img src="/images/bg-header-desktop.svg" width={"100%"} />
        {Boolean(filter.length) && (
          <div className={styles.filters}>
            {Boolean(filter.length) &&
              filter.map((filter) => (
                <RemoveButton
                  key={filter}
                  onClick={() => {
                    setFilter((preFilters) => {
                      const updatedFilter = preFilters.filter(
                        (preFilter) => preFilter !== filter
                      );
                      return updatedFilter;
                    });
                  }}
                >
                  {filter}
                </RemoveButton>
              ))}
            <span className={styles.clear} onClick={() => setFilter([])}>
              Clear
            </span>
          </div>
        )}
      </header>
      <section>
        {jobs &&
          filteredJobs.map((job, index) => (
            <JobCard
              key={index}
              filter={filter}
              setFilter={setFilter}
              jobDetails={job}
            />
          ))}
      </section>
    </div>
  );
}

export default App;

const RemoveButton = ({ children, onClick }) => {
  return (
    <div className={styles.remove_button}>
      <span>{children}</span>
      <button onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
          <path
            fill="#FFF"
            fillRule="evenodd"
            d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"
          />
        </svg>
      </button>
    </div>
  );
};
