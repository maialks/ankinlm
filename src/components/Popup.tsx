import React from 'react';
import { CoffeeIcon, GithubIcon, InfoIcon, AlertCircleIcon, Bug } from 'lucide-react';
const Popup = () => {
  return (
    <div className='popup-container'>
      {/* Header */}
      <div className='popup-header'>
        <h1 className='popup-title'>AnkiNLM</h1>
        <div className='popup-version'>v1.2</div>
      </div>
      {/* Content */}
      <div className='popup-content'>
        {/* Main description */}
        <div className='content-section'>
          <InfoIcon className='icon icon-info' />
          <p className='text-content'>
            The <span className='highlight'>Copy</span> and{' '}
            <span className='highlight'>Download</span> buttons will appear on the footer of the
            NotebookLM Studio interface.
          </p>
        </div>
        {/* Warning */}
        <div className='content-section'>
          <AlertCircleIcon className='icon icon-warning' />
          <div className='text-content'>
            <p>
              <span className='warning-highlight'>Note:</span> Resizing the window may cause the
              buttons to disappear. If this happens, please refresh the page.
            </p>
            <p className='warning-detail'>
              This bug will be fixed in future updates. A history section is also planned.
            </p>
          </div>
        </div>
        <div className='divider'></div>
        {/* Links */}
        <div className='links-container'>
          <a
            href='https://www.buymeacoffee.com/lkmss'
            target='_blank'
            rel='noopener noreferrer'
            className='link-button'
          >
            <CoffeeIcon className='icon' />
            <span>Support</span>
          </a>
          <a
            href='https://github.com/maialks'
            target='_blank'
            rel='noopener noreferrer'
            className='link-button'
          >
            <GithubIcon className='icon' />
            <span>GitHub</span>
          </a>
          <a
            href='https://forms.gle/GaEgRg9tZ9e2EVco9'
            target='_blank'
            rel='noopener noreferrer'
            className='link-button'
          >
            <Bug className='icon' />
            <span>Report Issue</span>
          </a>
        </div>
      </div>
      {/* Footer */}
      <div className='popup-footer'>
        <p className='footer-text'>by lkmss</p>
      </div>
    </div>
  );
};

export default Popup;
