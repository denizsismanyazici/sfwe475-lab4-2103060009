export type Filter = "all" | "done" | "open";

type FilterBarProps = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
};

function FilterBar({ filter, onFilterChange }: FilterBarProps) {
  return (
    <div>
      <button
        onClick={() => onFilterChange("all")}
        style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
      >
        All tasks
      </button>
      <button
        onClick={() => onFilterChange("done")}
        style={{ fontWeight: filter === "done" ? "bold" : "normal" }}
      >
        Done tasks
      </button>
      <button
        onClick={() => onFilterChange("open")}
        style={{ fontWeight: filter === "open" ? "bold" : "normal" }}
      >
        Open tasks
      </button>
    </div>
  );
}

export default FilterBar;
