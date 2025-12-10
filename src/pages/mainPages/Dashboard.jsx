import { role } from '../../../index.js';
import TaskDashboard from '../adminPages/Lms/Task.jsx';
import AdminDashboard from "../adminPages/AdminDashboard.jsx";

function Dashboard() {
	switch (role) {
		case 'ADMIN':
			return <AdminDashboard/>;
		case 'EMPLOYEE':
			return <h1>EMPLOYEE</h1>;

		default:
			alert('Unknown role:', role);
	}
}

export default Dashboard;
