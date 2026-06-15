import { Home, Search, Layers, User } from 'lucide-react';

const TABS = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'discover', label: 'Discover', Icon: Search },
  { id: 'campaigns', label: 'Campaigns', Icon: Layers },
  { id: 'profile', label: 'Profile', Icon: User },
];

export default function MobileShell({ title, activeTab, onSelectTab, children, overlay, fab }) {
  return (
    <div className="app-bg">
      <div className="phone">
        <div className="ios-statusbar">
          <span className="ios-statusbar__time">9:41</span>
          <span className="ios-statusbar__icons" aria-hidden="true">
            <span className="ios-sig" /> <span className="ios-wifi" /> <span className="ios-batt" />
          </span>
        </div>
        <header className="app-header">
          <span className="app-header__title">{title}</span>
        </header>
        <main className="app-content">{children}</main>
        <nav className="tabbar" aria-label="Primary">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              className={'tabbar__item' + (id === activeTab ? ' tabbar__item--active' : '')}
              aria-current={id === activeTab ? 'page' : undefined}
              onClick={() => onSelectTab(id)}
            >
              <Icon size={22} strokeWidth={2} />
              <span className="tabbar__label">{label}</span>
            </button>
          ))}
          <span className="tabbar__home-indicator" aria-hidden="true" />
        </nav>
        {/* FAB slot: fixed within the phone frame (won't scroll with content);
            sits below the overlay so the takeover scrim covers it. */}
        {fab}
        {/* Full-phone overlay slot (scoped to the frame, covers chrome+tabbar). */}
        {overlay}
      </div>
    </div>
  );
}
