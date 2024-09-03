import React, {useState, useEffect} from 'react'
import Sidenav from '../Navigations/Sidenav';
import Navbar from '../Navigations/Navbar';
import axios from 'axios';
import image from '../Images/himmarebrandlogo-removebg-preview.png'
import { BASE_URL } from '../../../utils/globals';

function Presenters() {
  const [presenter, setPresenter] = useState([]);
  const [formData, setFormData] = useState({
    fullname: '',
    nickname: '',
    bio: '',
    avatar: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'avatar' ) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    const fetchPresenter = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/presenters`);
        setPresenter(response.data);
        console.log(response)
      }catch(error) {
        console.error('Error fetching presenters:', error)
      }
    };

    fetchPresenter();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append('fullname', formData.fullname);
      form.append('nickname', formData.nickname);
      form.append('bio', formData.bio);
      form.append('avatar', formData.avatar);

      await axios.post(`${BASE_URL}/presenters`, form);

      alert('Presenter added successfully');

      setFormData({
        fullname: '',
        nickname: '',
        bio: '',
        avatar: null,
      });
    }catch(error) {
      console.error('Error adding new presenters:', error);
      alert ('Failed to add presenter. Please try again')
    }
  };

  const handleDeletePresenter = async (presenterId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/presenters/${presenterId}`
      );

      if (response.status === 200) {
        alert('Presenter deleted successfully');
        
        const updatedPresenters = presenters.filter(
          (presenter) => presenter.id !== presenterId
        );
        setPresenters(updatedPresenters);
      } else {
        alert('Failed to delete presenter. Please try again');
      }
    } catch (error) {
      console.error('Error deleting presenter:', error);
      alert('Failed to delete presenter. Please try again');
    }
  };

  return (
    <div>
      <div className='dash_board'>
        <div className='dash-sidenav'>
          <Sidenav />
        </div>

        <div className='dash-navbar'>
          <Navbar />
          <div className='presenter-section'>
            
            <form onSubmit={handleSubmit}>
              <label>
                Fullname:
                <input
                  type='text'
                  name='fullname'
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />

              <label>
                Nickname:
                <input
                  type='text'
                  name='nickname'
                  value={formData.nickname}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />

              <label>
                Bio:
                <textarea
                  name='bio'
                  value={formData.bio}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />

              <label>
                Avatar:
                <input
                  type='file'
                  accept='image/*'
                  name='avatar'
                  onChange={handleChange}
                />
              </label>
              <br />

              <button className='presenter-btn' type='submit'>
                Add Presenter
              </button>
            </form>
          </div>

          <div className='presentrs-list'>
            <div className='presenters-imageholder'>
              {presenter &&
                presenter.map((item) => (
                  <div className='presenter-one'>
                    <img src={item.avatar} alt='' />
                    <div>
                      <button
                        className='presenter-button'
                        onClick={() => handleDeletePresenter(item.id)}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Presenters