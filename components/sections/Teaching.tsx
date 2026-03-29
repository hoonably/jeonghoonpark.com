import { TeachingItem } from "@/types";

interface TeachingProps {
  onItemClick: (item: TeachingItem) => void;
  items: TeachingItem[];
}

export default function Teaching({ onItemClick, items }: TeachingProps) {
  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, TeachingItem[]>);

  // Get distinct categories in sorted order (optional)
  const categories = Object.keys(groupedItems);

  return (
    <section id="teaching" className="snap-section section">
      <div className="container">
        <p className="section-label">Education</p>
        <h2 className="section-title">Teaching</h2>

        <div className="teaching-container">
          {categories.map((category) => (
            <div key={category} className="teaching-block">
              <h3 className="teaching-role-title">{category}</h3>
              <ul className="teaching-list">
                {groupedItems[category].map((item, i) => (
                  <li
                    key={item.slug || i}
                    className={`teaching-item${(item.slug || item.content) ? " clickable" : ""}`}
                    onClick={() => (item.slug || item.content) && onItemClick(item)}
                  >
                    <div className="teaching-content">
                      <span className="teaching-title">{item.title}</span>
                      <p className="teaching-org">{item.org}</p>
                    </div>
                    <span className="teaching-period">{item.period}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
