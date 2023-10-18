import { Loader } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';
import React from 'react';
import Select from 'react-select';
import { getBlastGroups } from '../../libs/apis/index.js';
import { dateFormat } from '../../utils/functions.js';
import BlastInformation from './BlastInfo.js';
import FollowUpStyle from './style.js';

const FollowUp = () => {
  const api = new ApiClient();
  const [loading, setLoading] = React.useState(false);
  const [blastGroups, setBlastGroups] = React.useState([]);
  const [apiURI, setApiURI] = React.useState('');
  const [, setTotal] = React.useState(0);
  const [offset] = React.useState(0);
  const [limit] = React.useState(50);
  const [blasts, setBlasts] = React.useState([]);

  React.useEffect(() => {
    const fetchServerSide = async () => {
      setLoading(true);
      try {
        const response: any = await api.getPage({
          pageName: 'followUp',
        });
        const { data } = response;
        if (data?.apiURI) setApiURI(data.apiURI);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('error', error);
      }
    };

    fetchServerSide();
  }, []);

  // Load animation by populating data after a delay (using useEffect and useState)

  React.useEffect(() => {
    if (!apiURI) return;
    (async () => {
      try {
        setLoading(true);
        const data = await getBlastGroups(apiURI, limit, offset, true);
        if (data?.total) setTotal(data.total);
        if (data?.items?.length) setBlastGroups(data.items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    })();
  }, [apiURI]);

  const blastGroupsOptions = blastGroups.map((group) => ({
    value: group.id,
    label: dateFormat(group.createdAt, true),
  }));

  const handleBlastGroupChange = React.useCallback(
    async (value) => {
      const selectedBlastGroupId = value?.value;
      const selectedBlastGroup = blastGroups.find((group) => group.id === selectedBlastGroupId);
      setBlasts(selectedBlastGroup?.blastIds || []);
    },
    [blastGroups, apiURI],
  );

  return (
    <div style={{ padding: '2rem', boxSizing: 'border-box' }}>
      <FollowUpStyle.ContainerFollowUp>
        <FollowUpStyle.Card>
          <FollowUpStyle.Title>Follow Up Page</FollowUpStyle.Title>
        </FollowUpStyle.Card>
      </FollowUpStyle.ContainerFollowUp>
      <div
        style={{
          background: 'white',
          borderRadius: '10px',
          padding: '2rem',
          boxSizing: 'border-box',
          height: '100%',
        }}
      >
        <div style={{ width: '350px', margin: '0 auto' }}>
          <Select
            defaultValue={{
              value: blastGroupsOptions?.length > 0 ? blastGroupsOptions[0].value : '',
              label:
                blastGroupsOptions?.length > 0 ? blastGroupsOptions[0].label : 'Select a blast',
            }}
            onChange={handleBlastGroupChange}
            placeholder="Select a blast"
            options={blastGroupsOptions}
          />
        </div>
        {loading ? <Loader /> : <BlastInformation blasts={blasts} />}
      </div>
    </div>
  );
};

export default FollowUp;
