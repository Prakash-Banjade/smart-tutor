import React, { useState } from 'react';

const CreateStudyGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [topic, setTopic] = useState('');
  const [subTopic, setSubTopic] = useState('');
  const [location, setLocation] = useState('Online (Zoom)');
  const [customLocation, setCustomLocation] = useState('');
  const [members, setMembers] = useState(1);
  const [maxMembers, setMaxMembers] = useState(5);
  const [educationLevel, setEducationLevel] = useState('All Levels');
  const [customEducation, setCustomEducation] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [requests, setRequests] = useState([]);
  const [showRequest, setShowRequest] = useState(false);

  const handleCreateGroup = () => {
    // Logic to create a group, probably sending the data to a backend or context
    console.log({
      groupName,
      topic,
      subTopic,
      location: location === 'Custom' ? customLocation : location,
      members,
      maxMembers,
      educationLevel: educationLevel === 'Custom' ? customEducation : educationLevel,
      groupDescription,
    });
  };

  const handleJoinRequest = (studentName: string) => {
    // Logic for accepting the join request
    setRequests((prev) => prev.filter((request) => request !== studentName));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Study Group</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div>
            <label className="block text-gray-700">Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., Data Structures and Algorithms"
              className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Data Structure and Algorithm"
              className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Sub-Topic</label>
            <input
              type="text"
              value={subTopic}
              onChange={(e) => setSubTopic(e.target.value)}
              placeholder="e.g., DSA with Java"
              className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Online (Zoom)">Online (Zoom)</option>
              <option value="In-Person (Tribhuvan University)">In-Person (Tribhuvan University)</option>
              <option value="Custom">Custom</option>
            </select>
            {location === 'Custom' && (
              <div className="mt-2">
                <label className="block text-gray-700">Custom Location</label>
                <input
                  type="text"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  placeholder="Enter custom location"
                  className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Max Members</label>
            <input
              type="number"
              value={maxMembers}
              onChange={(e) => setMaxMembers(Number(e.target.value))}
              min={1}
              max={20}
              className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Education Level</label>
            <select
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All Levels">All Levels</option>
              <option value="Undergraduate (Course)">Undergraduate (Course)</option>
              <option value="Graduate (Course)">Graduate (Course)</option>
              <option value="Custom">Custom</option>
            </select>
            {educationLevel === 'Custom' && (
              <div className="mt-2">
                <label className="block text-gray-700">Custom Education Level</label>
                <input
                  type="text"
                  value={customEducation}
                  onChange={(e) => setCustomEducation(e.target.value)}
                  placeholder="e.g., Must know Java Syntax"
                  className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Group Description</label>
            <textarea
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              placeholder="e.g., This group is focused on algorithm practice and coding challenges. Great for interview preparation!"
              rows={4}
              className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleCreateGroup}
          className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Study Group
        </button>
      </form>

      {/* Requests Section */}
      {showRequest && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Requests</h3>
          {requests.length === 0 ? (
            <p className="text-gray-500">No requests yet.</p>
          ) : (
            requests.map((request, idx) => (
              <div key={idx} className="flex justify-between items-center bg-white rounded-lg shadow p-4 mb-4">
                <p className="font-medium text-gray-800">{request}</p>
                <div className="space-x-4">
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    onClick={() => handleJoinRequest(request)}
                  >
                    Accept
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CreateStudyGroup;
