import React from "react";
import { connect} from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, users }) {
	if (!users) {
		return <Navigate to="/login" replace="true" />;
	}
	return children;
}

const mapStateToProps = (state) => {
	return {
		users: state.authReducer.users,
	};
};
export default connect(mapStateToProps)(ProtectedRoute);

// export default ProtectedRoute;
