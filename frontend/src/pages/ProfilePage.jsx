import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import StarRating from '../components/StarRating';
import Loading from '../components/Loading';

function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await api.get('/reviews/my-reviews');
        if (data.success) setReviews(data.data || []);
      } catch {
        setReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    };
    fetchReviews();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(form);
      setEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await api.delete(`/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      toast.success('Review deleted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete review');
    }
  };

  if (!user) return <Loading />;

  return (
    <div className="profile-page">
      <div className="container">
        <h1>My Profile</h1>

        <div className="profile-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Personal Information</h2>
            {!editing && (
              <button className="btn btn-outline btn-sm" onClick={() => setEditing(true)}>
                <FiEdit2 size={14} /> Edit
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleSave}>
              <div className="auth-form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '4px' }}>
                  First Name
                </p>
                <p style={{ fontWeight: 600 }}>{user.firstName}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '4px' }}>
                  Last Name
                </p>
                <p style={{ fontWeight: 600 }}>{user.lastName}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '4px' }}>
                  Email
                </p>
                <p style={{ fontWeight: 600 }}>{user.email}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '4px' }}>
                  Phone
                </p>
                <p style={{ fontWeight: 600 }}>{user.phone || '—'}</p>
              </div>
            </div>
          )}
        </div>

        <div className="profile-card">
          <h2>My Reviews</h2>
          {loadingReviews ? (
            <Loading text="Loading reviews..." />
          ) : reviews.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '24px' }}>
              You haven't written any reviews yet.
            </p>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                style={{
                  padding: '16px 0',
                  borderBottom: '1px solid var(--border-light)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <div>
                  <StarRating rating={review.rating} size={14} />
                  <h4 style={{ fontSize: '0.95rem', marginTop: '6px' }}>{review.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                    {review.comment}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '6px' }}>
                    {new Date(review.createdAt).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleDeleteReview(review._id)}
                  style={{ color: 'var(--danger)', flexShrink: 0 }}
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
