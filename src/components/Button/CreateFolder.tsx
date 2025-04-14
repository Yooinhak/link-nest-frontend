'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { useDrawer } from '@components/Drawer';
import { OriginInput } from '@components/Input';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@utils/react-query/queryKeys';
import { createClient } from '@utils/supabase/component';

import { Button } from '.';

const Component = () => {
  const form = useForm();
  const supabase = createClient();
  const queryClient = useQueryClient();

  const { openDrawer, closeDrawer, Drawer } = useDrawer();

  const handleCreate = async () => {
    const data = form.getValues();

    const { error } = await supabase.from('folders').insert({ name: data.name });

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
        폴더 생성
      </Button>
      <Drawer
        title="폴더 생성"
        description="nest-link를 한곳에 모아서 볼 수 있어요!"
        buttons={[
          { label: '닫기', onClick: closeDrawer, variant: 'outline' },
          { label: '저장', onClick: handleCreate },
        ]}
      >
        <FormProvider {...form}>
          <div className="flex justify-center">
            <div className="w-full max-w-[500px] p-4">
              <OriginInput className="" {...form.register('name', { required: true })} />
            </div>
          </div>
        </FormProvider>
      </Drawer>
    </>
  );
};

export default Component;
