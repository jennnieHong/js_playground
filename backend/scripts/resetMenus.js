import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = path.join(__dirname, '../database/cssStudy.db');
const db = new sqlite3.Database(dbPath);

console.log('Cleaning duplicate menus and resetting database...\n');

db.serialize(() => {
  // 1. 기존 메뉴 모두 삭제
  db.run('DELETE FROM menus', (err) => {
    if (err) {
      console.error('Error deleting menus:', err);
      db.close();
      return;
    }
    console.log('✓ All existing menus deleted');
  });

  // 2. Auto-increment 카운터 리셋
  db.run('DELETE FROM sqlite_sequence WHERE name="menus"', (err) => {
    if (err) {
      console.error('Error resetting sequence:', err);
    }
  });

  // 3. 초기 메뉴 다시 추가 (새로운 분류 체계)
  const menuStructure = [
    {
      title: 'Fundamental Basics',
      icon: '🏛️',
      order: 1,
      children: [
        { title: 'Display Study', path: '/display', icon: '📐', order: 1 },
        { title: 'Box Model Study', path: '/box-model', icon: '📦', order: 2 },
        { title: 'Units & Sizing', path: '/units', icon: '📏', order: 3 },
        { title: 'Viewport Units', path: '/viewport-units', icon: '📱', order: 4 },
        { title: 'Position Study', path: '/position', icon: '📍', order: 5 },
        { title: 'Relative & Absolute', path: '/relative-absolute', icon: '🎯', order: 6 },
        { title: 'Height & Sizing', path: '/height', icon: '📐', order: 7 },
        { title: 'Float & Clear Study', path: '/float', icon: '🌊', order: 8 },
        { title: 'Logical Properties', path: '/logical-properties', icon: '🌐', order: 9 },
      ]
    },
    {
      title: 'Layout Mastery',
      icon: '📐',
      order: 2,
      children: [
        { title: 'Flexbox Study', path: '/flexbox', icon: '📦', order: 1 },
        { title: 'Grid Study', path: '/grid', icon: '⚡', order: 2 },
        { title: 'Responsive Study', path: '/responsive', icon: '📱', order: 3 },
        { title: 'Container Queries', path: '/container-queries', icon: '📦', order: 4 },
      ]
    },
    {
      title: 'Visual Design',
      icon: '🎨',
      order: 3,
      children: [
        { title: 'Colors & Backgrounds', path: '/colors', icon: '🌈', order: 1 },
        { title: 'Typography', path: '/typography', icon: '✍️', order: 2 },
        { title: 'Custom Properties', path: '/custom-properties', icon: '🎛️', order: 3 },
        { title: 'Hiding Methods', path: '/hiding', icon: '👻', order: 4 },
      ]
    },
    {
      title: 'Selectors & States',
      icon: '🎯',
      order: 4,
      children: [
        { title: 'CSS Selectors & Naming', path: '/selectors-basics', icon: '🔤', order: 1 },
        { title: 'States & Pseudo-classes', path: '/interaction', icon: '🔄', order: 2 },
        { title: 'Modal & Popup 패턴', path: '/modal-pattern', icon: '🪟', order: 3 },
        { title: 'Pseudo Elements', path: '/pseudo-elements', icon: '::', order: 4 },
        { title: 'Modern Selectors', path: '/selectors', icon: '🎯', order: 5 },
        { title: 'Specificity (명시도)', path: '/specificity', icon: '⚖️', order: 6 },
        { title: 'Color 상속과 적용', path: '/color-inheritance', icon: '🎨', order: 7 },
      ]
    },
    {
      title: 'Motion & Forms',
      icon: '✨',
      order: 5,
      children: [
        { title: 'CSS Animations', path: '/animation-new', icon: '✨', order: 1 },
        { title: 'Animation (Legacy)', path: '/animation-old', icon: '🎬', order: 2 },
        { title: 'Form Styling', path: '/forms', icon: '📝', order: 3 },
      ]
    },
    {
      title: 'Advanced & Performance',
      icon: '⚡',
      order: 6,
      children: [
        { title: 'Stacking & Layers', path: '/stacking', icon: '📚', order: 1 },
        { title: 'Accessibility (A11y)', path: '/accessibility', icon: '♿', order: 2 },
        { title: 'Performance & Rendering', path: '/performance', icon: '⚡', order: 3 },
        { title: 'CSS Architecture', path: '/architecture', icon: '🏗️', order: 4 },
        { title: 'Attributes & JS', path: '/attributes-js', icon: '⚙️', order: 5 },
      ]
    },
    {
      title: 'Master Mission',
      icon: '🚩',
      order: 7,
      children: [
        { title: 'Master Challenge', path: '/challenge', icon: '🏆', order: 1 },
      ]
    }
  ];

  console.log('\nAdding all menus...\n');

  const insertMenu = (title, path, parentId, orderIndex, icon) => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO menus (title, path, parent_id, order_index, icon) VALUES (?, ?, ?, ?, ?)',
        [title, path, parentId, orderIndex, icon],
        function (err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  };

  async function processMenus() {
    try {
      for (const group of menuStructure) {
        const groupId = await insertMenu(group.title, null, null, group.order, group.icon);
        console.log(`✓ Group Added: ${group.title} (ID: ${groupId})`);

        for (const item of group.children) {
          const itemId = await insertMenu(item.title, item.path, groupId, item.order, item.icon);
          console.log(`  - Item Added: ${item.title}`);
        }
      }
      console.log('\n✅ Database reset complete!');
      console.log('✅ All menus added successfully!\n');
    } catch (err) {
      console.error('Error processing menus:', err);
    } finally {
      db.close((err) => {
        if (err) console.error('Error closing database:', err);
        else console.log('Database connection closed.');
      });
    }
  }

  processMenus();
});
