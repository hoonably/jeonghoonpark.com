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
        <p className="section-desc" style={{ 
          fontSize: '0.85rem', 
          marginTop: '-0.5rem', 
          marginBottom: '1rem' 
        }}>
          Click a course title to view more details.
        </p>

        <div className="teaching-container">
          {categories.map((category) => (
            <div key={category} className="teaching-block">
              <h3 className="teaching-role-title">{category}</h3>
              <ul className="teaching-list">
                {groupedItems[category].map((item, i) => (
                  <li key={item.slug || i} className="teaching-item">
                    <div className="teaching-main">
                      {(item.slug || item.content) ? (
                        <span
                          className="teaching-title clickable-title"
                          onClick={() => onItemClick(item)}
                        >
                          {item.title}
                        </span>
                      ) : (
                        <span className="teaching-title">{item.title}</span>
                      )}
                      <span className="teaching-period">{item.period}</span>
                      <span className="teaching-org">{item.org}</span>
                    </div>
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
