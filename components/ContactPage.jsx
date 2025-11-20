import { Mail, MessageSquare, User } from 'lucide-react';

export function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    // Add form submission logic here
  };

  return (
    <div className="contact-page">
      <div className="contact-content space-y-6">
        <div className="contact-intro">
          <h2>Contact Us</h2>
          <p>
            Have questions, feedback, or suggestions? We'd love to hear from you! 
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label className="form-label">
              <User className="icon-sm" />
              <span>Name</span>
            </label>
            <input 
              type="text" 
              placeholder="Enter your name"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Mail className="icon-sm" />
              <span>Email</span>
            </label>
            <input 
              type="email" 
              placeholder="your.email@example.com"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <MessageSquare className="icon-sm" />
              <span>Message</span>
            </label>
            <textarea 
              placeholder="Tell us what's on your mind..."
              className="form-textarea"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary contact-submit">
            Send Message
          </button>
        </form>

        <div className="contact-info">
          <h3>Other Ways to Reach Us</h3>
          <div className="contact-details">
            <p>
              <strong>Email:</strong> contact@battleofthecosmos.com
            </p>
            <p>
              <strong>Response Time:</strong> We typically respond within 24-48 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
