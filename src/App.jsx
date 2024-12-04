// Context imports
import { CommentsProvider } from "./components/CommentsProvider";

// Component imports
import AppContent from "./components/appContent/AppContent";

function App() {
  return (
    <CommentsProvider>
      <AppContent />
    </CommentsProvider>
  );
}

export default App;
