import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = ({ profile }) => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-light shadow-sm" style={{ borderRadius: '15px', backgroundColor: '#ffffff' ,height: '600px'}}>
            <div className="card-header text-center" style={{ backgroundColor: '#004d99', color: '#ffffff', borderRadius: '15px 15px 0 0', height:'100px'}}>
              <h2 className="h4 mb-0">Profile Card</h2>
            </div>
            <div className="card-body text-center" >
              <img
                src={''}
                className="img-fluid rounded-circle mb-4"
                alt="Profile"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h4 className="card-title mb-3" style={{ color: '#004d99' }}>{profile.fullname}</h4>
              <div className="table-responsive">
                <table className="table table-borderless table-sm mx-auto" style={{ maxWidth: '100%' }}>
                  <tbody>
                    <tr>
                      <td className="text-start"><strong>ID:</strong></td>
                      <td className="text-start">{profile.id}</td>
                    </tr>
                    <tr>
                      <td className="text-start"><strong>Email:</strong></td>
                      <td className="text-start">{profile.email}</td>
                    </tr>
                    <tr>
                      <td className="text-start"><strong>Phone:</strong></td>
                      <td className="text-start">{profile.phone}</td>
                    </tr>
                    <tr>
                      <td className="text-start"><strong>Institution:</strong></td>
                      <td className="text-start">{profile.institution}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
