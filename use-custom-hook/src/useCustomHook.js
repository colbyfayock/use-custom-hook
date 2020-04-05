export default function useCustomHook (settings = {}) {
  const { message } = settings;
  return {
    message
  };
}