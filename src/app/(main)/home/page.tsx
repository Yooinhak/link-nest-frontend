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

export default function HomePage() {
  return (
    <Drawer>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>폴더 생성</DrawerTitle>
          <DrawerDescription>nest-link를 한곳에 모아서 볼 수 있어요!</DrawerDescription>
        </DrawerHeader>

        <DrawerClose>
          <div>test123</div>
        </DrawerClose>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
