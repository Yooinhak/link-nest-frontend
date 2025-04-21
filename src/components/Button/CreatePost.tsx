'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { useDrawer } from '@components/Drawer';
import { OriginInput } from '@components/Input';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@utils/react-query/queryKeys';
import { createClient } from '@utils/supabase/component';

import { Button } from '.';

const Component = ({ folderId }: { folderId: string }) => {
  const form = useForm();
  const supabase = createClient();
  const queryClient = useQueryClient();

  const { openDrawer, closeDrawer, Drawer } = useDrawer();

  const handleCreate = async () => {
    const data = form.getValues();

    const { error } = await supabase
      .from('posts')
      .insert({ url: data.url, description: data.description, folder_id: Number(folderId) });

    if (!error) {
      queryClient.invalidateQueries({ queryKey: [queryKeys.FOLDER_LIST] });
      closeDrawer();
    } else {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={openDrawer} className="mb-4">
        게시글 생성
      </Button>
      <Drawer
        title="게시글 생성"
        buttons={[
          { label: '닫기', onClick: closeDrawer, variant: 'outline' },
          { label: '저장', onClick: handleCreate },
        ]}
      >
        <FormProvider {...form}>
          <div className="flex justify-center">
            <div className="w-full max-w-[500px] p-4">
              <OriginInput className="" {...form.register('url', { required: true })} />
              <OriginInput className="" {...form.register('description')} />
            </div>
          </div>
        </FormProvider>
      </Drawer>
    </>
  );
};

export default Component;
