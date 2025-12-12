import { role } from '../../../index.js';
// import TaskDashboard from '../adminPages/Lms/Task.jsx';
import AdminDashboard from "../adminPages/AdminDashboard.jsx";
// import EmployeeLayout from '../../layouts/EmployeeLayout.jsx';

function Dashboard() {
	switch (role) {
		case 'ADMIN':
			return <AdminDashboard/>;
		case 'EMPLOYEE':
			// return <EmployeeLayout />

		default:
			alert('Unknown role:', role);
	}
}

export default Dashboard;
