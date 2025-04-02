'use client';

import { FormProvider, useForm } from 'react-hook-form';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@components/Drawer';
import { OriginInput } from '@components/Input';
import { createClient } from '@utils/supabase/component';

import { Button } from '.';

const Component = () => {
  const form = useForm();
  const supabase = createClient();

  const handleCreate = async () => {
    const data = form.getValues();

    const res = await supabase.from('folders').insert({ name: data.name });
    console.log(res);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <FormProvider {...form}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>폴더 생성</DrawerTitle>
            <DrawerDescription>nest-link를 한곳에 모아서 볼 수 있어요!</DrawerDescription>
          </DrawerHeader>

          <div className="flex justify-center">
            <div className="w-full max-w-[500px] p-4">
              <OriginInput className="" {...form.register('name', { required: true })} />
            </div>
          </div>

          <div className="flex justify-center">
            <DrawerFooter className="w-full max-w-[500px]">
              <DrawerClose asChild>
                <Button variant="outline">닫기</Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button onClick={handleCreate}>저장</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </FormProvider>
    </Drawer>
  );
};

export default Component;
