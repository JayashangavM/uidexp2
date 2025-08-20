



const UserProfile = ({ user }) =>
  user ? (
    <div style={{ textAlign: 'center', margin: 20 }}>
      <h2>{user.displayName || user.email}</h2>
      <p>{user.email}</p>
    </div>
  ) : null;

export default UserProfile;
