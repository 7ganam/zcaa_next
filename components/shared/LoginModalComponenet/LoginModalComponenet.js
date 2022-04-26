import React, {useState} from 'react';
import {Modal, ModalBody} from 'reactstrap';
import {Container} from 'reactstrap';
// import zc_logo from './zc_logo.png'
import GooglebtnComponent from './GooglebtnComponent/GooglebtnComponent';

import {useContext} from 'react';
import {LoginContext} from '../../../contexts/loginContext';
import {Alert} from 'reactstrap';
import ReactLoading from 'react-loading';

function LoginModalComponenet() {
  const {login, IsLoggedIn, Token, ToggleLoginModal, IsLogInModalShown} =
    useContext(LoginContext);

  const [modal, setModal] = useState(false);
  const [Response_json_content, setResponse_json_content] = useState({});
  const [Fetch_success, setFetch_success] = useState(false);
  const [Sending_data, setSending_data] = useState(false);
  const [Fetch_error, setFetch_error] = useState(false);
  const [Error_message, setError_message] = useState(null);
  const toggle = ToggleLoginModal;

  const submit_applicant = async (google_data) => {
    try {
      // toggle();
      setSending_data(true);
      let id_token = google_data.tokenObj.id_token;
      const body_data = {google_data};
      console.log('google_data', google_data);
      const response = await fetch(
        //     `
        // ${process.env.NEXT_PUBLIC_BACKEND_URL}
        `api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body_data),
        }
      );
      const response_json_content = await response.json();
      if (!response.ok) {
        setFetch_error(true);
        throw new Error(response_json_content.message || "can't login");
      }
      setSending_data(false);
      setResponse_json_content(response_json_content);

      if (response_json_content.message === 'success') {
        setFetch_success(true);
        console.log({response_json_content});
        login(
          response_json_content.token,
          response_json_content.user,
          response_json_content.expirateion_date_string,
          true
        );
        toggle();
      }
      console.log('google_data2', google_data);
    } catch (err) {
      setSending_data(false);
      setError_message(err.message);
      console.log(err);
    }
  };

  return (
    <div>
      <div id='google_modal'>
        <Modal
          size='lg'
          style={{
            maxWidth: '1600px',
            width: '80%',
            marginRight: 'auto',
            marginLeft: 'auto',
            backgroundColor: 'transparent',
          }}
          isOpen={IsLogInModalShown}
          toggle={toggle}>
          <div style={{}}></div>
          <ModalBody style={{padding: '0px'}}>
            <div style={{}}>
              {
                <Container
                  fluid
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0px',
                  }}>
                  <div id='login_card' style={{}}>
                    <img
                      style={{
                        width: '150px',
                        height: 'auto',
                        opacity: '0.5',
                        marginTop: '70px',
                      }}
                      src={'/logo.png'}
                      alt='logo'
                    />
                    <div id='login_disclaimer'>
                      <span className='font1'>Use your </span>
                      <span className='font2'>zewailcity email </span>
                      <span className='font1'>to Login </span>
                    </div>
                    <div style={{marginTop: '10px'}}>
                      <div style={{position: 'relative'}}>
                        <GooglebtnComponent onclick={submit_applicant} />
                        <div
                          style={{
                            position: 'absolute',
                            top: '15px',
                            left: '45%',
                            zIndex: '0',
                          }}>
                          <ReactLoading
                            type={'spin'}
                            color={'#00D2F9'}
                            width={'20px'}
                          />
                        </div>
                      </div>

                      {Fetch_error ? (
                        <Alert
                          color='danger'
                          className='mt-3'
                          style={{width: '100%'}}>
                          {Error_message}
                        </Alert>
                      ) : null}
                    </div>
                  </div>
                </Container>
              }
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

export default LoginModalComponenet;
